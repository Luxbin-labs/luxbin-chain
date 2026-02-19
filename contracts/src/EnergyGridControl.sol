// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title EnergyGridControl
 * @dev Decentralized energy grid optimization using LUXBIN photonic encoding
 * @notice Manages global energy consumption through photonic command signals
 * @author NicheAI - Sustainable Computing Technologies
 */
contract EnergyGridControl is Ownable, ReentrancyGuard {
    // Structs
    struct GridCommand {
        string command;           // e.g., "REDUCE_LOAD_15%"
        string region;           // Geographic region
        bytes photonicData;      // LUXBIN encoded photonic sequence
        address proposer;        // Command proposer
        uint256 timestamp;       // Proposal time
        uint256 executionTime;   // When to execute
        bool executed;          // Execution status
        uint256 votesFor;       // Consensus votes (weighted by capacity)
        uint256 votesAgainst;    // Weighted votes against
    }

    struct EnergyNode {
        address nodeAddress;
        string location;
        uint256 capacity;        // Energy capacity in MW
        bool isActive;
        uint256 lastHeartbeat;
        uint256 votingPower;     // Derived from capacity (1 MW = 1 voting power)
        uint256 totalVotesCast;  // Track total votes cast by this node
    }

    // State variables
    mapping(uint256 => GridCommand) public commands;
    mapping(address => EnergyNode) public energyNodes;
    mapping(uint256 => mapping(address => bool)) public hasVoted; // commandId => voter => voted
    mapping(address => bool) public authorizedProposers;

    uint256 public commandCount;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant EXECUTION_DELAY = 1 hours;
    uint256 public constant MIN_APPROVAL_PERCENTAGE = 60; // 60% weighted vote required
    uint256 public constant MIN_PARTICIPATION_PERCENTAGE = 30; // 30% of total capacity must vote

    // New: Track total active capacity for quorum calculations
    uint256 public totalActiveCapacity;

    // Events
    event CommandProposed(uint256 indexed commandId, string command, string region, address proposer);
    event CommandVoted(uint256 indexed commandId, address voter, uint256 votingPower, bool support);
    event CommandExecuted(uint256 indexed commandId, bytes photonicData, uint256 totalVotesFor, uint256 totalVotesAgainst);
    event NodeRegistered(address indexed nodeAddress, string location, uint256 capacity, uint256 votingPower);
    event NodeDeactivated(address indexed nodeAddress);
    event VotingPowerUpdated(address indexed nodeAddress, uint256 newVotingPower);

    // Modifiers
    modifier onlyActiveNode() {
        require(energyNodes[msg.sender].isActive, "Node not active or registered");
        _;
    }

    modifier commandExists(uint256 _commandId) {
        require(_commandId > 0 && _commandId <= commandCount, "Command does not exist");
        _;
    }

    modifier votingOpen(uint256 _commandId) {
        GridCommand storage cmd = commands[_commandId];
        require(block.timestamp <= cmd.timestamp + VOTING_PERIOD, "Voting period ended");
        require(!cmd.executed, "Command already executed");
        _;
    }

    constructor() {
        // Initialize owner as authorized proposer
        authorizedProposers[owner()] = true;
    }

    /**
     * @dev Propose a new energy grid command
     * @param _command The energy command (e.g., "REDUCE_LOAD_15%")
     * @param _region Geographic region for command
     * @param _photonicData LUXBIN encoded photonic sequence
     */
    function proposeCommand(
        string calldata _command,
        string calldata _region,
        bytes calldata _photonicData
    ) external onlyOwner nonReentrant { // Only owner for demo, expand in production
        require(bytes(_command).length > 0, "Command cannot be empty");
        require(bytes(_region).length > 0, "Region cannot be empty");
        require(_photonicData.length > 0, "Photonic data required");

        commandCount++;
        GridCommand storage newCommand = commands[commandCount];
        newCommand.command = _command;
        newCommand.region = _region;
        newCommand.photonicData = _photonicData;
        newCommand.proposer = msg.sender;
        newCommand.timestamp = block.timestamp;
        newCommand.executionTime = block.timestamp + VOTING_PERIOD + EXECUTION_DELAY;

        emit CommandProposed(commandCount, _command, _region, msg.sender);
    }

    /**
     * @dev Vote on a proposed command with weighted voting power
     * @param _commandId ID of the command to vote on
     * @param _support True for approval, false for rejection
     */
    function voteOnCommand(
        uint256 _commandId,
        bool _support
    ) external onlyActiveNode commandExists(_commandId) votingOpen(_commandId) nonReentrant {
        require(!hasVoted[_commandId][msg.sender], "Already voted");

        EnergyNode storage voter = energyNodes[msg.sender];
        GridCommand storage cmd = commands[_commandId];

        // Mark as voted
        hasVoted[_commandId][msg.sender] = true;
        voter.totalVotesCast++;

        // Apply weighted voting based on node capacity
        uint256 votingWeight = voter.votingPower;

        if (_support) {
            cmd.votesFor += votingWeight;
        } else {
            cmd.votesAgainst += votingWeight;
        }

        emit CommandVoted(_commandId, msg.sender, votingWeight, _support);

        // Check if consensus can be reached
        _checkAndExecuteCommand(_commandId);
    }

    /**
     * @dev Check if command meets criteria for execution
     * @param _commandId Command to check
     */
    function _checkAndExecuteCommand(uint256 _commandId) internal {
        GridCommand storage cmd = commands[_commandId];
        
        // Calculate total votes cast
        uint256 totalVotesCast = cmd.votesFor + cmd.votesAgainst;
        
        // Check minimum participation (quorum)
        if (totalVotesCast < (totalActiveCapacity * MIN_PARTICIPATION_PERCENTAGE) / 100) {
            return; // Not enough participation yet
        }

        // Check approval percentage
        if (totalVotesCast > 0) {
            uint256 approvalPercentage = (cmd.votesFor * 100) / totalVotesCast;
            
            if (approvalPercentage >= MIN_APPROVAL_PERCENTAGE) {
                _executeCommand(_commandId);
            }
        }
    }

    /**
     * @dev Execute a command after voting period
     * @param _commandId ID of the command to execute
     */
    function executeCommand(uint256 _commandId) external commandExists(_commandId) nonReentrant {
        GridCommand storage cmd = commands[_commandId];
        require(!cmd.executed, "Command already executed");
        require(block.timestamp >= cmd.timestamp + VOTING_PERIOD, "Voting period not ended");

        uint256 totalVotesCast = cmd.votesFor + cmd.votesAgainst;
        require(totalVotesCast > 0, "No votes cast");

        // Check quorum
        require(totalVotesCast >= (totalActiveCapacity * MIN_PARTICIPATION_PERCENTAGE) / 100, 
                "Quorum not reached");

        // Check approval
        uint256 approvalPercentage = (cmd.votesFor * 100) / totalVotesCast;
        require(approvalPercentage >= MIN_APPROVAL_PERCENTAGE, "Command not approved");

        _executeCommand(_commandId);
    }

    /**
     * @dev Internal execution of approved command
     * @param _commandId Command to execute
     */
    function _executeCommand(uint256 _commandId) internal {
        GridCommand storage cmd = commands[_commandId];
        require(!cmd.executed, "Command already executed");
        
        cmd.executed = true;

        // Emit photonic signal for satellite transmission
        emit PhotonicSignalEmitted(_commandId, cmd.photonicData);
        emit CommandExecuted(_commandId, cmd.photonicData, cmd.votesFor, cmd.votesAgainst);

        console.log("Energy grid command executed:", cmd.command);
        console.log("Region:", cmd.region);
        console.log("Votes For (MW):", cmd.votesFor);
        console.log("Votes Against (MW):", cmd.votesAgainst);
    }

    /**
     * @dev Register an energy node in the grid with weighted voting power
     * @param _location Geographic location
     * @param _capacity Energy capacity in MW
     */
    function registerEnergyNode(
        string calldata _location,
        uint256 _capacity
    ) external nonReentrant {
        require(!energyNodes[msg.sender].isActive, "Node already registered");
        require(_capacity > 0, "Capacity must be greater than 0");

        // Calculate voting power (1 MW = 1 voting power, with minimum 1)
        uint256 votingPower = _capacity;

        energyNodes[msg.sender] = EnergyNode({
            nodeAddress: msg.sender,
            location: _location,
            capacity: _capacity,
            isActive: true,
            lastHeartbeat: block.timestamp,
            votingPower: votingPower,
            totalVotesCast: 0
        });

        // Update total active capacity
        totalActiveCapacity += _capacity;

        emit NodeRegistered(msg.sender, _location, _capacity, votingPower);
    }

    /**
     * @dev Update node heartbeat to maintain active status
     */
    function heartbeat() external onlyActiveNode {
        energyNodes[msg.sender].lastHeartbeat = block.timestamp;
    }

    /**
     * @dev Deactivate node (if heartbeat expired)
     * @param _nodeAddress Address of node to deactivate
     */
    function deactivateNode(address _nodeAddress) external onlyOwner {
        require(energyNodes[_nodeAddress].isActive, "Node not active");
        
        uint256 capacity = energyNodes[_nodeAddress].capacity;
        energyNodes[_nodeAddress].isActive = false;
        
        // Update total active capacity
        totalActiveCapacity -= capacity;
        
        emit NodeDeactivated(_nodeAddress);
    }

    /**
     * @dev Check node health and auto-deactivate if heartbeat too old
     * @param _nodeAddress Address of node to check
     */
    function checkNodeHealth(address _nodeAddress) external {
        EnergyNode storage node = energyNodes[_nodeAddress];
        require(node.isActive, "Node not active");
        
        // Deactivate if no heartbeat for 30 days
        if (block.timestamp > node.lastHeartbeat + 30 days) {
            totalActiveCapacity -= node.capacity;
            node.isActive = false;
            emit NodeDeactivated(_nodeAddress);
        }
    }

    /**
     * @dev Get current voting power for a node
     * @param _nodeAddress Address of node
     * @return Voting power in MW
     */
    function getVotingPower(address _nodeAddress) external view returns (uint256) {
        if (!energyNodes[_nodeAddress].isActive) {
            return 0;
        }
        return energyNodes[_nodeAddress].votingPower;
    }

    /**
     * @dev Get command status with vote breakdown
     * @param _commandId Command ID
     */
    function getCommandStatus(uint256 _commandId) external view commandExists(_commandId) returns (
        string memory command,
        string memory region,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 totalVotes,
        uint256 approvalPercentage,
        bool executable,
        bool executed
    ) {
        GridCommand storage cmd = commands[_commandId];
        totalVotes = cmd.votesFor + cmd.votesAgainst;
        
        uint256 approvalPct = 0;
        if (totalVotes > 0) {
            approvalPct = (cmd.votesFor * 100) / totalVotes;
        }
        
        bool meetsQuorum = totalVotes >= (totalActiveCapacity * MIN_PARTICIPATION_PERCENTAGE) / 100;
        bool meetsApproval = totalVotes > 0 && approvalPct >= MIN_APPROVAL_PERCENTAGE;
        
        return (
            cmd.command,
            cmd.region,
            cmd.votesFor,
            cmd.votesAgainst,
            totalVotes,
            approvalPct,
            (meetsQuorum && meetsApproval && !cmd.executed),
            cmd.executed
        );
    }

    /**
     * @dev Get total active capacity
     * @return Total capacity in MW
     */
    function getTotalGridCapacity() external view returns (uint256) {
        return totalActiveCapacity;
    }

    /**
     * @dev Emergency shutdown (owner only)
     */
    function emergencyShutdown() external onlyOwner {
        console.log("Emergency shutdown initiated by:", msg.sender);
    }
}

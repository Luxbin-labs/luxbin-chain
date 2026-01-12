import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

/**
 * Generate Coinbase Pay session token
 * Required for secure initialization with Coinbase Pay v3 API
 *
 * Documentation: https://docs.cdp.coinbase.com/onramp-&-offramp/session-token-authentication
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destinationWalletAddress, destinationNetworks, assetSymbols } = body;

    // Get Coinbase CDP credentials
    const apiKeyName = process.env.COINBASE_API_KEY_NAME;
    const privateKey = process.env.COINBASE_API_SECRET;

    if (!apiKeyName || !privateKey) {
      console.error('Missing CDP credentials:', {
        hasKeyName: !!apiKeyName,
        hasPrivateKey: !!privateKey
      });
      return NextResponse.json(
        { error: 'Coinbase CDP credentials not configured' },
        { status: 500 }
      );
    }

    // Generate JWT token for CDP authentication
    const now = Math.floor(Date.now() / 1000);
    const jwtPayload = {
      sub: apiKeyName,
      iss: 'coinbase-cloud',
      nbf: now,
      exp: now + 120, // Token expires in 2 minutes
      aud: ['cdp_service']
    };

    const jwtToken = jwt.sign(jwtPayload, privateKey.trim(), {
      algorithm: 'ES256',
      keyid: apiKeyName
    });

    console.log('Generated JWT token for CDP authentication');

    // Call Coinbase Onramp API to generate session token
    const sessionResponse = await fetch('https://api.developer.coinbase.com/onramp/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        addresses: [{
          address: destinationWalletAddress,
          blockchains: destinationNetworks
        }],
        assets: assetSymbols
      })
    });

    if (!sessionResponse.ok) {
      const errorText = await sessionResponse.text();
      console.error('Coinbase session API error:', {
        status: sessionResponse.status,
        statusText: sessionResponse.statusText,
        error: errorText
      });

      return NextResponse.json({
        error: 'Failed to generate session token',
        details: errorText,
        status: sessionResponse.status
      }, { status: sessionResponse.status });
    }

    const sessionData = await sessionResponse.json();
    console.log('Session token generated successfully');

    return NextResponse.json({
      sessionToken: sessionData.token || sessionData.sessionToken,
      success: true
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Session generation error:', error);

    return NextResponse.json({
      error: 'Internal server error generating session token',
      details: errorMessage
    }, { status: 500 });
  }
}

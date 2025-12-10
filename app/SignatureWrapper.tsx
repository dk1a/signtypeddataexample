import { Signature } from '@coinbase/onchainkit/signature';
import { useState } from 'react';
import { signTypedData } from 'viem/actions';
import { base } from 'viem/chains';
import { getAction, toHex } from 'viem/utils';
import { useConnectorClient } from 'wagmi';

export default function SignatureWrapper() {
  const [signature, setSignature] = useState<string | null>(null);
  const { data: connectorClient } = useConnectorClient()

  const domain = {
    verifyingContract: "0x28d10E6aAb1a749Be792b4D8aa0519c70E83386a",
    salt: toHex(base.id, { size: 32 })
  } as const;

  const types = {
    Call: [
      { name: 'signer', type: 'address' },
      { name: 'systemNamespace', type: 'string' },
      { name: 'systemName', type: 'string' },
      { name: 'callData', type: 'bytes' },
      { name: 'nonce', type: 'uint256' },
    ],
  } as const;

  async function onClick() {
    if (!connectorClient) {
      setSignature("error: no client");
      return;
    }

    const message = {
      signer: connectorClient.account.address,
      systemNamespace: "world",
      systemName: "RegistrationSystem",
      callData: "0x01020304050607080910",
      nonce: 2n
    } as const;

    const result = await getAction(
      connectorClient,
      signTypedData,
      "signTypedData"
    )({
      account: connectorClient.account,
      // EIP-712 domain bound to World contract and chain
      domain,
      // MUD's CallWithSignature type definitions
      types,
      primaryType: "Call",
      // Message contains all call details + nonce
      message
    })
    setSignature(result);
  }

  return (
    <div>
      {/*<Signature
        domain={domain}
        types={types}
        primaryType="Call"
        message={message}
        label="Sign EIP712"
        onSuccess={(signature: string) => setSignature(signature)}
        onError={(e) => console.error(e)}
      />*/}
      <button onClick={onClick}>Sign EIP-712</button>
      <p style={{ overflowWrap: "anywhere" }}>Signature: {signature}</p>
    </div>
  );
}
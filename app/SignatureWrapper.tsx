import { Signature } from '@coinbase/onchainkit/signature';
import { useState } from 'react';
import { toHex } from 'viem';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';

export default function SignatureWrapper() {
  const [signature, setSignature] = useState<string | null>(null);
  const { address } = useAccount()

  const domain = {
    //name: 'test123',
    //version: '1.0.0',
    chainId: base.id,
    verifyingContract: '0x28d10E6aAb1a749Be792b4D8aa0519c70E83386a',
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

  const message = {
    signer: address,
    systemNamespace: "world",
    systemName: "RegistrationSystem",
    callData: "0x01020304050607080910",
    nonce: 2n
  } as const;

  return (
    <div>
      <Signature
        domain={domain}
        types={types}
        primaryType="Call"
        message={message}
        label="Sign EIP712"
        onSuccess={(signature: string) => setSignature(signature)}
        onError={(e) => console.error(e)}
      />
      <p style={{ overflowWrap: "anywhere" }}>Signature: {signature}</p>
    </div>
  );
}

/*
import { Signature } from '@coinbase/onchainkit/signature';
import { useState } from 'react';
import { toHex } from 'viem';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';

export default function SignatureWrapper() {
  const [signature, setSignature] = useState<string | null>(null);
  const { address } = useAccount()

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

  const message = {
    signer: address,
    systemNamespace: "world",
    systemName: "RegistrationSystem",
    callData: "0x01020304050607080910",
    nonce: 2n
  } as const;

  return (
    <div>
      <Signature
        domain={domain}
        types={types}
        primaryType="Call"
        message={message}
        label="Sign EIP712"
        onSuccess={(signature: string) => setSignature(signature)}
        onError={(e) => console.error(e)}
      />
      <p style={{ overflowWrap: "anywhere" }}>Signature: {signature}</p>
    </div>
  );
}
*/
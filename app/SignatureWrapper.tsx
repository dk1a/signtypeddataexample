import { Signature } from '@coinbase/onchainkit/signature';
import { useState } from 'react';
import { encodeAbiParameters } from 'viem';
import { base } from 'viem/chains';

export default function SignatureWrapper() {
  const [signature, setSignature] = useState<string | null>(null);

  const domain = {
    name: 'EAS Attestation',
    version: '1.0.0',
    chainId: base.id,
    verifyingContract: '0x4200000000000000000000000000000000000021',
  } as const;

  const types = {
    Attest: [
      { name: 'schema', type: 'bytes32' },
      { name: 'recipient', type: 'address' },
      { name: 'time', type: 'uint64' },
      { name: 'revocable', type: 'bool' },
      { name: 'refUID', type: 'bytes32' },
      { name: 'data', type: 'bytes' },
      { name: 'value', type: 'uint256' },
    ],
  } as const;

  const message = {
    schema: '0xf58b8b212ef75ee8cd7e8d803c37c03e0519890502d5e99ee2412aae1456cafe',
    recipient: '0x1230000000000000000000000000000000000000',
    time: BigInt(0),
    revocable: false,
    refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
    data: encodeAbiParameters([{ type: 'string' }], ['test attestation']),
    value: BigInt(0),
  } as const;

  return (
    <div>
      <Signature
        domain={domain}
        types={types}
        primaryType="Attest"
        message={message}
        label="Sign EIP712"
        onSuccess={(signature: string) => setSignature(signature)}
        onError={(e) => console.error(e)}
      />
      <p style={{ overflowWrap: "anywhere" }}>Signature: {signature}</p>
    </div>
  );
}
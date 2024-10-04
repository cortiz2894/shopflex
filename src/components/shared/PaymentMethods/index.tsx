import Image from 'next/image';

interface PaymentMethodType {
  id: number;
  name: string;
  image: string;
}

interface Props {
  methods: PaymentMethodType[];
}

const PaymentMethods = ({ methods }: Props) => {
  return (
    <div className="flex gap-2 justify-between">
      {methods.map((method) => (
        <div
          key={method.id}
          className="border border-standard-lighter px-4 rounded max-h-12 overflow-hidden flex items-center justify-center"
        >
          <Image src={`/images/${method.image}`} width="60" height="60" alt={method.name} />
        </div>
      ))}
    </div>
  );
};

export default PaymentMethods;

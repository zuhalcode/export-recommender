type CardProps = {
  value: number;
};
const Card = ({ value }: CardProps) => {
  return <div>Card {value}</div>;
};

export default Card;

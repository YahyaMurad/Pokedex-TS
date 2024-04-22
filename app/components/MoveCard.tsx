interface MoveCardProps {
  content: string;
}

const MoveCard: React.FC<MoveCardProps> = ({ content }) => {
  return <div className="btn mr-3 hover:cursor-default">{content}</div>;
};

export default MoveCard;

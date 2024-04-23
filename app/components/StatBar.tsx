interface StatBarProps {
  content: string;
}

const StatBar: React.FC<StatBarProps> = ({ content }) => {
  return (
    <div className="flex w-1/3 flex-row items-start justify-between">
      <div>{content}</div>
      <div>
        <progress
          className="progress progress-primary w-56"
          value={Math.floor(Math.random() * 101)}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default StatBar;

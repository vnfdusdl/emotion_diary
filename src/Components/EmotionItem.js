const EmotionItem = ({ emotion_id, emotion_img, emotion_description, onClick, isSelected }) => {
  return (
    <div
      className={['emotion-col', isSelected ? `emotion-${emotion_id}-on` : `emotion-off`].join(' ')}
      key={emotion_id}
      onClick={() => onClick(emotion_id)}>
      <img src={emotion_img} />
      <span>{emotion_description}</span>
    </div>
  );
};

export default EmotionItem;

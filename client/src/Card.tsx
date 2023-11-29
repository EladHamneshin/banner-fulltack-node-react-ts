import { CardProps } from "./CardProps";
export const Card = ({ card, onShowDetails, isShowingDetails }: CardProps) => {
    const { name, imageUrl } = card;
    return (
        <div className="card">
            <img src={imageUrl} alt={name} />
            <h3>{name}</h3>
            <button onClick={onShowDetails}>Show Details</button>
            {isShowingDetails && <p>{card.name}</p>}
        </div>
    );
};
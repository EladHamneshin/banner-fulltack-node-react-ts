export interface CardProps {
    card: {
        name: string;
        imageUrl: string;
    };
    onShowDetails: () => void;
    isShowingDetails: boolean;
}
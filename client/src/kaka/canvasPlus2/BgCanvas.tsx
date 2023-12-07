import { useState } from "react";


const images = [
    { src: `/reka/1.svg`, name: 'Background 1' },
    { src: `/reka/2.svg`, name: 'Background 2' },
    { src: `/reka/3.svg`, name: 'Background 3' },
    { src: `/reka/4.svg`, name: 'Background 4' },
    { src: `/reka/5.svg`, name: 'Background 5' },
    { src: `/reka/6.svg`, name: 'Background 6' },
    { src: `/reka/7.svg`, name: 'Background 7' },
    { src: `/reka/8.svg`, name: 'Background 8' },
];

type Props = {
    image: string,
    onChange: (bgImage: string) => void
}

const BackgroundImage = (props: Props) => {
    const { image, onChange } = props

    const [bgImage, setBgImage] = useState(image);

    function handleImageClick(selectedImage: string) {
        setBgImage(selectedImage);
        onChange(selectedImage);
    }

    return (
        <div className="images">
            {
                images.map(image => (
                    <img
                        src={image.src}
                        alt={image.name}
                        onClick={() => handleImageClick(image.src)}
                        style={{ padding: '4px' }}
                        width="200px"
                        key={image.src + image.name}
                    />
                ))
            }
        </div>
    );
}


export default BackgroundImage

import React from 'react'



const useBoolean = (boll : boolean) : [boolean ,() => void,() => void ]=> {
    const [boolean, setOpen] = React.useState<boolean>(boll);

const handleClickTrue = () => {
  setOpen(true);
};

const handleFalse = () => {
  setOpen(false);
};
  return [boolean , handleClickTrue, handleFalse]
}

export default useBoolean

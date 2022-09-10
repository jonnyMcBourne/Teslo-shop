import { FC } from "react"
import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { ISizes } from "../../context/cart/CartContext"
interface Props{
    selectedSize:ISizes
    sizes:ISizes[]
    onSelectedSize:(size:ISizes)=>void
}

const SizeSelector:FC<Props> = ({selectedSize,sizes,onSelectedSize}) => {
  return (
    <Box margin={2} >
        {sizes.map(size=>{ return (
          <Button
            onClick={() => onSelectedSize(size)}
            key={size}
            size="small"
            color={selectedSize === size ? "info" : "primary"}
          >
            {size}
          </Button>
        );})}
    </Box>
  )
}

export default SizeSelector
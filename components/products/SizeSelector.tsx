import { FC } from "react"
import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { ISizes } from "../../interfaces"
interface Props{
    selectedSize:ISizes
    sizes:ISizes[]
}

const SizeSelector:FC<Props> = ({selectedSize,sizes}) => {
  return (
    <Box margin={2} >
        {sizes.map(size=>{ return (
          <Button key={size} size="small" color={selectedSize === size ? 'info':'primary'}>
            {size}
          </Button>
        );})}
    </Box>
  )
}

export default SizeSelector
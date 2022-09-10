import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, Chip, IconButton, Typography } from "@mui/material"
import { FC } from "react"

interface Props {
  updatedQuantity: number;
  onAddQuantity: () => void;
  onDecreaseQuantity: () => void;
  isMaxReached:boolean
}
const ItemCounter: FC<Props> = ({
  updatedQuantity,
  onDecreaseQuantity,
  onAddQuantity,
  isMaxReached
}) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton onClick={onDecreaseQuantity}>
          <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{ width: 40, textAlign: "center" }}>
          {updatedQuantity}
        </Typography>
        <IconButton onClick={onAddQuantity}>
          <AddCircleOutline />
        </IconButton>
      </Box>

      {isMaxReached && (
        <Chip
          color="error"
          variant="outlined"
          label="Maximum amount of products available reached"
        />
      )}
    </>
  );
};

export default ItemCounter
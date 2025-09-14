import React from "react";
import {Card, CardMedia, CardContent, Typography, CardActionArea, Box} from "@mui/material";
import {Item} from "../types";

const ItemCard: React.FC<{ item: Item; onClick?: () => void }> = ({item, onClick}) => {
    return (
        <Card>
            <CardActionArea onClick={onClick}>
                {item.imageUrl && (
                    <CardMedia>
                        <Box component="img" src={item.imageUrl} alt={item.name}
                             sx={{width: "100%", height: 250, objectFit: "contain", background: "#f5f5f5"}}/>
                    </CardMedia>
                )}
                <CardContent>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.manufacturer}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ItemCard;

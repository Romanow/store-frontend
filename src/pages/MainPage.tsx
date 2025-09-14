import React, {useState} from "react";
import {Grid2, CircularProgress, Box} from "@mui/material";
import {useGetItemsQuery} from "../features/api/apiSlice";
import ItemCard from "../components/ItemCard.tsx";
import ItemModal from "../components/ItemModal.tsx";

const MainPage: React.FC = () => {
    const {data: items, isLoading} = useGetItemsQuery();
    const [selected, setSelected] = useState<string | null>(null);

    const selectedItem = items?.find((i) => i.name === selected) ?? null;

    return (
        <Box>
            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={6}>
                    <CircularProgress/>
                </Box>
            ) : (
                <Grid2 container spacing={2}>
                    {items?.map((item) => (
                        <Grid2 size={{xs: 12, sm: 6, md: 4}} key={item.name}>
                            <ItemCard item={item} onClick={() => setSelected(item.name)}/>
                        </Grid2>
                    ))}
                </Grid2>
            )}

            {selectedItem && (<ItemModal open={!!selected} item={selectedItem} onClose={() => setSelected(null)}/>)}
        </Box>
    );
};

export default MainPage;

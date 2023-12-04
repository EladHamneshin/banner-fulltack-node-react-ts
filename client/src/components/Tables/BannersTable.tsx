import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ResponseBanner } from '../../types/BannerInterface';
import { Box } from '@mui/system';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 60, type: 'string' },
    { field: 'Name', headerName: 'Name', minWidth: 90, type: 'string' },
    { field: 'productID', headerName: 'Product', type: 'string', minWidth: 90 },
    { field: 'categoryID', headerName: 'Category', type: 'string', minWidth: 90 },
    { field: 'author', headerName: 'Author', type: 'string', minWidth: 90 },
    { field: 'creationDate', headerName: 'Creation Date', type: 'string', minWidth: 110 },
    // { field: 'click', headerName: 'Clicks', type: 'number', width: 40 },
    // { field: 'kind', headerName: 'Kind', width: 40 },
    // { field: 'size', headerName: 'Size', width: 40 },
    // { field: 'text', headerName: 'Description', width: 110 }
];

type Props = {
    pro: ResponseBanner[];
};

export default function BannersTable(props: Props) {
    const rows: any = [];
    props.pro.forEach((element) => {
        rows.push({
            id: element._id,
            Name: element.name, // Corrected field name from 'name' to 'Name'
            productID: element.productID,
            categoryID: element.catogryID, // Corrected field name from 'catogryID' to 'categoryID'
            author: element.author,
            creationDate: element.createdAt, // Corrected field name from 'createdAt' to 'creationDate'
            // click: element.clickCount,
            // kind: element.kind,
            // size: element.size,
            // text: element.text
        });
    });

    return (
        <Box sx={{ height: '60vh', width: '40vw' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoPageSize
                pageSizeOptions={[2, 5, 10, 25]}
                checkboxSelection
            />
        </Box>
    );
}

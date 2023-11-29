import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ResponseBanner } from '../../types/BannerInterface';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40, type: "string" },
    { field: 'Name', headerName: 'Name', width: 60, type: 'string' },
    { field: 'productID', headerName: 'Product', type: 'string', width: 40 },
    { field: 'categoryID', headerName: 'Category', type: 'string', width: 40 },
    { field: 'author', headerName: 'Author', type: 'string', width: 60 },
    { field: 'creationDate', headerName: 'Creation Date', type: 'dateTime', width: 90 },
    { field: 'click', headerName: 'Clicks', type: 'number', width: 40 },
    { field: 'kind', headerName: 'Kind', width: 40 },
    { field: 'size', headerName: 'Size', width: 40 },
    { field: 'text', headerName: 'Description', width: 110 }
];
type Props = {
    pro: ResponseBanner[]
}

export default function BannersTable(props: Props) {
    const rows: any = [];
    props.pro.forEach((element) => {
        rows.push(
            {
                id: element._id,
                name: element.name,
                productID: element.productID,
                catogryID: element.catogryID,
                author: element.author,
                createdAt: element.createdAt,
                click: element.clickCount,
                kind: element.kind,
                size: element.size,
                text: element.text
            }
        );
    })
    return (
        <div style={{ height: 400 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[2, 5, 10, 25]}
                checkboxSelection
            />
        </div>
    );
}

import { DataGrid, GridColDef } from '@mui/x-data-grid';
export type BannerInterface = {
    _id?: string;
    name: string;
    productID: string;
    catogryID: string;
    click: number;
    size: "side" | "top" | "all";
    kind: ("price" | "sale")[];
    text: string;
    createdAt: Date;
    author: string;
}
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, type: "string" },
    { field: 'Name', headerName: 'Name', width: 130, type: 'string' },
    { field: 'productID', headerName: 'Product', type: 'string', width: 70 },
    { field: 'categoryID', headerName: 'Category', type: 'string', width: 80 },
    { field: 'author', headerName: 'Author', type: 'string', width: 120 },
    { field: 'creationDate', headerName: 'Creation Date', type: 'dateTime', width: 90 },
    { field: 'click', headerName: 'Clicks', type: 'number', width: 100 },
    { field: 'kind', headerName: 'Kind', width: 100 },
    { field: 'size', headerName: 'Size', width: 90 },
    { field: 'text', headerName: 'Description', width: 350 }
];

export default function BannersTable(props: { pro: BannerInterface[] }) {
    const rows:any = [];
    props.pro.forEach((element) => {
        rows.push(
            {
                id: element._id,
                name: element.name,
                productID: element.productID,
                catogryID: element.catogryID,
                author: element.author,
                createdAt: element.createdAt,
                click: element.click,
                kind: element.kind,
                size: element.size,
                text: element.text
            }
        );
    })
    return (
        <div style={{ height: 400, width: '100%' }}>
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

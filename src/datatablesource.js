export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Image", // Update this field to match your data structure
    headerName: "Image",
    width: 230,
    renderCell: (params) => {
      return (
          <div className="cellWithImg">
            {params.row.images.map((image, index) => (
                <img
                    key={index}
                    className="cellImg"
                    src={image}
                    alt={`Avatar ${index}`}
                />
            ))}
            {params.row.username} {/* Replace with the correct field */}
          </div>
      );
    },
  },
  {
    field: "Stock",
    headerName: "Stock",
    width: 230,
  },
  {
    field: "Title", // Update this field to match your data structure
    headerName: "Title",
    width: 230,
  },
  {
    field: "Price", // Update this field to match your data structure
    headerName: "Price",
    width: 230,
  },
  {
    field: "images", // Update this field to match your data structure
    headerName: "Images",
    width: 100,
  },
];

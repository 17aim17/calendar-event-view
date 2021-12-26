export default ({ typeofday }) => {
    const todObj = {
        "hair cut": "Cu",
        "protein treatment": "Pr",
        "hair color": "HC",
        "deep conditioning": "DC",
        "clarifying": "C",
        "hair oiling": "Ho"
    }

    return (
        <div>
            {
                Array.isArray(typeofday) && <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'center' }}>
                    {
                        typeofday.map(tod => <div key={tod} style={{ padding: '0 .5px 0 .5px', borderRadius: "100px", fontWeight: '200', backgroundColor: "#a3def8" }}> {todObj[tod]} </div>)
                    } </div>
            }
        </div>
    )
}
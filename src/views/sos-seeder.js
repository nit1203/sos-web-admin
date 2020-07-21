const sosData = [
    {

        name: 'Nitin Singh',
        type: 'Driver',
        time: new Date().toISOString(),
        country: 'India',
        state: 'Maharashtra',
        city: 'Mumbai',
        tripNumber: '254'
    },
    {

        name: 'Raj Pawar',
        type: 'Passanger',
        time: new Date().toISOString(),
        country: 'India',
        state: 'Hyderabad',
        city: 'Chennai',
        tripNumber: '4562'
    }
]

const columns = [
    {
        title: "DriverName",
        field: "driver_name"
    },
    {
        title: "CustomerName",
        field: "customer_name"
    },
    {
        title: "Type",
        field: "type"
    },
    {
        title: "Time",
        field: "time"
    },
    {
        title: "Country",
        field: "country"
    }, {
        title: "State",
        field: "state"
    },
    {
        title: "City",
        field: "city"
    },
    {
        title: "Trip No.",
        field: "tripNumber"
    },
    {
        title: 'Play Video',
        field: 'actions',
        sorting: false,
        filtering: false
    }

]


export { sosData, columns }
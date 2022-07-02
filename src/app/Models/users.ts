export interface Users {
    FullName: string,
    Email: string,
    Password: string,
    MobilePhones: string[],
    Address: {
        Country:string,
        Governorate:string,
        City: string,
        Street: string
    },
    paymentMethods: string[],
    purchases:string[]
}

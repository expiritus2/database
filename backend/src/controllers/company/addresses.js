const AddressModel = require('../../models/address');

class Addresses {
    constructor(addresses, company) {
        this.addresses = addresses;
        this.company = company;
    }

    create() {
        if (!this.addresses || !this.addresses.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const address of this.addresses) {
                await this.#createAddress(address);
            }
            resolve();
        });
    }

    update() {
        if (!this.addresses) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestAddresses = await this.#deleteRemovedAddresses();
            for await (const address of newestAddresses) {
                await this.#createAddress(address);
            }

            const notChangedAddresses = this.addresses.filter((address) => !!address.id);
            for await (const address of notChangedAddresses) {
                await AddressModel.update({
                    address: address && address.name ? address.name : '',
                }, { where: { id: address.id } })
            }
            resolve();
        });
    }

    delete(companyId) {
        return new Promise(async (resolve) => {
            await AddressModel.destroy({ where: { companyId }});
            resolve();
        });
    }

    #createAddress(address) {
        if (!address || !address.name) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newAddress = await AddressModel.create({ name: address.name });

            newAddress.setCompany(this.company);
            resolve(newAddress);
        });
    }

    #deleteRemovedAddresses() {
        return new Promise(async (resolve) => {
            const prevStoredAddresses = this.company.addresses || []
            const newAddressesIds = this.addresses.filter((address) => !!address.id).map((d) => d.id);

            for await (const prevStoredAddress of prevStoredAddresses) {
                if (!newAddressesIds.includes(prevStoredAddress.id)) {
                    await AddressModel.destroy({ where: { id: prevStoredAddress.id } });
                }
            }

            const newestAddresses = this.addresses.filter((address) => !address.id);

            resolve(newestAddresses);
        });
    }

}

module.exports = Addresses;
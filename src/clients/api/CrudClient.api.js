import {httpClient, clientHandler} from '@/clients/httpClient'

/**
 * @param entityType
 * @returns {{new(): CrudClient, endPoint: *, prototype: CrudClient}}
 * https://stackoverflow.com/a/43553836/11171240
 */
export default class CrudClient {
    constructor(entityType) {
        this.endPoint = entityType+'/';
    }

    /**
     * @param data
     * @returns {Object|Void}
     */
    async create(data) {
        return clientHandler(httpClient.post(this.endPoint+'create', data))
    }

    /**
     * @param path
     * @returns {Object|Void}
     */
    async read(path) {
        return clientHandler(httpClient.get(this.endPoint+path))
    }

    /**
     * @param data
     * @returns {Object|Void}
     */
    async update(data) {
        return clientHandler(httpClient.patch(this.endPoint+data.id, data))
    }

    /**
     * @param ID
     * @returns {Object|Void}
     */
    async delete(ID) {
        return clientHandler(httpClient.delete(this.endPoint+ID))
    }
}
import { observable, action } from 'mobx'

class Store {

    @observable userInfo = {
        name: 'Mobx Store'
    };
    @observable loading = false;
    @action updateName = (name) => {
        this.userInfo.name = name
    }

    @action updateLoading = (isBoolean: boolean) => {
        this.loading = isBoolean
    }
}

export type StoreType = Store;


export default new Store()

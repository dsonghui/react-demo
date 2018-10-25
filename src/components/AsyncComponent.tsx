import Loadable from 'react-loadable';
import AsyncLoading from "./AsyncLoading";

export default function (loader, loadingComponent?) {
    return Loadable({
        loader,
        loading: loadingComponent ? loadingComponent : AsyncLoading
    });
}

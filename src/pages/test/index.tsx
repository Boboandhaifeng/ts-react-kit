// import asyncComponent from 'AsyncComponent';
// import * as Loadable  from 'react-loadable';
// export interface AntProps {
//     name: string
//     company: string
// }
// const MyLoadingComponent = ({ isLoading, error }) => {
//     if (isLoading) {
//         return <div>Loading...</div>
//     }
//     else if (error) {
//         return <div>Sorry, there was a problem loading the page.</div>
//     }
//     else {
//         return null;
//     }
// };
// const AsyncHome = Loadable({
//     loader: () => import('./page/home/'),
//     loading: MyLoadingComponent
// });
export {Home} from './home';
export {About} from './about';
export {Topics} from './topic';


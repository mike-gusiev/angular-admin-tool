// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { faPen, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

export const environment = {
  clientId: '363cd6ac96124ed',
  token: 'a7d210a15a00638ea354cbdf33b3cbcad1b6a7aa',
  mainApi: 'https://api.imgur.com/3/',
  uploadType: 'image',
  userName: 'MikeGusev',
  production: false,
  navbar: [
    {
      title: 'Home',
      link: 'home'
    },
    {
      title: 'Images',
      link: 'images'
    }
  ],
  imageIcons: {
    remove: faTrash,
    add: faPlus,
    close: faTimes
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

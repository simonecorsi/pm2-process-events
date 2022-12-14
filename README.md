# pm2-process-events

> Emits all process events from pm2 unix socket

This packages is used to asyncronously emit all pm2 process events.

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<!-- tocstop -->

## Installation

```sh
npm i --save pm2-process-events
# OR
yarn add pm2-process-events
```

<!-- USAGE EXAMPLES -->

## Usage

```js
import Pm2ProcessEvents from 'pm2-process-events';

const pm2Events = new Pm2ProcessEvents(
  // pm2.sock location, defaults to:
  `${process.env.HOME}/.pm2/pub.sock`
);

pm2Events.on('*', ({ namespace, payload }) => {
  console.log(namespace, payload);
});
```

You can filter events using `wildcards` matching, eg: `log:*`

```ts
// data format
{
  event: string;
  payload: any;
}
```

## Options

<!-- CONTRIBUTING -->

## Contributing

Project is pretty simple and straight forward for what is my needs, but if you have any idea you're welcome.

This projects uses [commitlint](https://commitlint.js.org/) with Angular configuration so be sure to use standard commit format or PR won't be accepted.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat(scope): some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Simone Corsi - [@im_simonecorsi](https://twitter.com/im_simonecorsi)

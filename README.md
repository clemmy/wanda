# wanda

Wanda is a Javascript gesture recognition library based on the [$P recognizer](http://depts.washington.edu/aimgroup/proj/dollar/pdollar.html). It's written with the UMD pattern, so it can be used anywhere.

## Usage

```
npm install --save wanda
```

Then, in your codebase,

```
import Wanda from 'wanda';

const wanda = new Wanda();

wanda.train(id, data);

const result = wanda.recognize(data);
```

### API

#### Wanda.train(id, data)

Add training data to wanda. ```id``` is a string identifier for the data. ```data``` is an array of strokes, where a stroke is an array of points. It will look something like this:

```
[
  [{x: 30, y: 146}, {x: 106, y: 222}], // stroke 1
  [{x: 30, y: 225}, {x: 106, y: 146}] // stroke 2
]
```

#### Wanda.recognize(data)

Recognize a gesture. ```data``` is an array of strokes, where a stroke is an array of points, the same as described above. This method will return a result that looks like the following:

```
{
  id: '<result id>',
  score: <confidence>
}
```

## Development

Install the dependencies with

```
npm install
```

## Running the tests

Testing for Wanda is done using [Ava](https://github.com/avajs/ava).

```
npm run test
```

## Built With

* Javascript
* :heart:

## License

This project is licensed under the MIT License.

## Acknowledgments

* Radu-Daniel Vatavu, University Stefan cel Mare of Suceava
* Lisa Anthony, University of Maryland—Baltimore County
* Jacob O. Wobbrock, University of Washington

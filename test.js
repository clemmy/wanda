import test from 'ava'
import TrainingSet from './trainingSet'
import Wanda from './dist/wanda'

const wanda = new Wanda()

test.before(t => {
  for (let t of TrainingSet) {
    wanda.train(t.id, t.data)
  }
})

test('Recognize T in normal stroke order', t => {
  const result = wanda.recognize([
    [{x: 30, y: 7}, {x: 113, y: 7}],
    [{x: 66, y: 7}, {x: 66, y: 87}]
  ])

  t.is(result.id, 'T')
})

test('Recognize N in reverse stroke order', async t => {
  const result = wanda.recognize([
    [{x: 247, y: 87}, {x: 247, y: 1}],
    [{x: 182, y: 1}, {x: 246, y: 95}],
    [{x: 177, y: 92}, {x: 177, y: 2}]
  ])

  t.is(result.id, 'N')
})

test('Recognize X with extra strokes', async t => {
  const result = wanda.recognize([
    [{x: 30, y: 146}, {x: 78, y: 184}],
    [{x: 30, y: 225}, {x: 78, y: 185}],
    [{x: 78, y: 184}, {x: 106, y: 222}],
    [{x: 78, y: 185}, {x: 106, y: 146}]
  ])

  t.is(result.id, 'X')
})

test('Recognize line translated and stretched', async t => {
  const result = wanda.recognize([
    [{x: 0, y: 100}, {x: 219, y: 100}]
  ])

  t.is(result.id, 'line')
})

test('Recognize arrowhead', async t => {
  const result = wanda.recognize([
    [{x: 506, y: 349}, {x: 574, y: 349}],
    [{x: 525, y: 306}, {x: 584, y: 349}, {x: 525, y: 380}]
  ])

  t.is(result.id, 'arrowhead')
})

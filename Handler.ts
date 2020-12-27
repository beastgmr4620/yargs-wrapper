import parser from './Handler/Parser';

let commandCompleted: boolean = true;

process.stdin.on('data', (raw) => {
  if (!commandCompleted) return;
  commandCompleted = false;

  parser
    .Instance()
    .parse(raw.toString('utf-8'))
    .then(() => {})
    .catch((err) => {})
    .finally(() => {
      commandCompleted = true;
    });
});

/**
 * This is a small example of my Yargs wrapper
 * I used this in my applications which simulate a bash-like interface
 * Default Yargs method is still good if you dont build something like me
 * This wrapper makes:
 * - use Yargs shit with Promises
 * - an intuitive way to create more commands
 */

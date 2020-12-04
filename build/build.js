async function check() {
  let canNext = await new Promise(resolve => {
    inquirer.prompt([
        {
          name: 'tip',
          type: 'confirm',
          message: `目录dist下面已经存在${project}-${projectConfig.version}文件，编译成功后文件会被覆盖，确定继续吗？`
        }
      ]).then(({ tip }) => {
        resolve(tip)
      })
  });
  console.log('canNext', canNext);
  if (!canNext) {
    console.log(chalk.yellow.bold('  您放弃了编译 \n' + ''))
    process.exit()
  }
}

installEnablableFeatureWithCondition(
    'hello-world',
    'Hello Google',
    () => true,
    () => {
        alert('hello world');
    }
)



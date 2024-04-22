
installEnablableFeatureWithCondition(
    'hello-world',
    'Hello World',
    () => true,
    () => {
        alert('hello world');
    }
)


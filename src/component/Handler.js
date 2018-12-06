/*This is a default function that can be used instead of polluting multiple components 
with handlers. 
    To use-
    1. Add a case to the switch event below that captures the stateful piece to be captured with the handler.
    2. Import Handler into the component where it is needed as below

        import Handler from '{the relative path}/Handler';
    3. Where the local handler event would be used replace with this Handler function as below.

        <Input className='input'
            type="username" 
            name="username" 
            id="username"
            value={this.state.username} 
            placeholder="Username"
            onChange={(e) => this.setState({username:Handler(e)})}
            />

*/


export default function Handler(props){
    let input = props.target.name;
    let val = props.target.value;
    switch(input){
        case 'username':
            return val;
        case 'category':
            return val;
        default: 
            break;
    }
}
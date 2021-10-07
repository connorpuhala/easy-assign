import { Grid, Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Form>
          <Form.Field>
            <input placeholder="Email" type="text" />
          </Form.Field>
          <Form.Field>
            <input placeholder="Password" type="password" />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
        <span>
          Don't have account?{" "}
          <a
            href="/create-account"
            onClick={(e) => {
              e.preventDefault();
              history.push("/create-account");
            }}
          >
            Create Account
          </a>
        </span>
      </Grid.Column>
    </Grid>
  );
};

export default Login;

import { Grid, Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
const Signup = () => {
  const history = useHistory();

  return (
    <Grid centered columns={4} style={{ paddingTop: "20px" }}>
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
          Already have account?{" "}
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              history.push("/");
            }}
          >
            Login
          </a>
        </span>
      </Grid.Column>
    </Grid>
  );
};

export default Signup;

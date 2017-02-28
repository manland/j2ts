package samples;

public class Simple {

    private Integer number;

    public String string;

    public Simple() {

    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public static class Builder {
        private Integer number;
        private String string;

        public Builder() {
        }

        public Builder setNumber(Integer number) {
            this.number = number;
            return this;
        }

        public Builder setString(String string) {
            this.string = string;
            return this;
        }

        public Simple build() {
            Simple simple = new Simple();
            simple.string = this.string;
            simple.setNumber(this.number);
            return simple;
        }

    }
}
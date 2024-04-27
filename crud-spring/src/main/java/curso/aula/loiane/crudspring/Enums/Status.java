package curso.aula.loiane.crudspring.Enums;

public enum Status {
    ATIVO("Ativo"), INATIVO("Inativo");

    private String value;

    private Status(String value) {
        this.value = value;
    }
    public String getStatus() {
        return value;
    }
    @Override
    public String toString() {
        return  value;
    }


}

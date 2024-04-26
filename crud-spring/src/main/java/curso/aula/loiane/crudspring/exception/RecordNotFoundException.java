package curso.aula.loiane.crudspring.exception;

public class RecordNotFoundException extends RuntimeException{

    private static final long serialVersionUIDLONG = 1L;
    public RecordNotFoundException(Long id) {
        super("Registro não encontrado para o id: " + id);
    }
}

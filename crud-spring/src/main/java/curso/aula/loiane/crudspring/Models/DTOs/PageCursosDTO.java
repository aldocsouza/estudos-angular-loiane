package curso.aula.loiane.crudspring.Models.DTOs;

import curso.aula.loiane.crudspring.Models.Cursos;
import org.hibernate.query.Page;

import java.util.List;

public record PageCursosDTO(
        List<CursoDTO> cursos, Long totalElements, int totalPage
) {
}

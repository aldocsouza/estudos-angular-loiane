package curso.aula.loiane.crudspring.Models.mappers;

import curso.aula.loiane.crudspring.Enums.Category;
import curso.aula.loiane.crudspring.Enums.Status;
import curso.aula.loiane.crudspring.Models.DTOs.CursoDTO;
import curso.aula.loiane.crudspring.Models.Cursos;
import org.springframework.stereotype.Component;

@Component
public class CursosMapper {

    public CursoDTO cursoDto(Cursos curso){
        if(curso == null){
            return null;
        }
        return new CursoDTO(curso.getId(), curso.getName(), curso.getCategory().getValue());
    }

    public Cursos toEntity(CursoDTO cursoDTO){
        if(cursoDTO == null){
            return null;
        }

        Cursos curso = new Cursos();
        if(cursoDTO.id() != null){
            curso.setId(cursoDTO.id());
        }
        curso.setName(cursoDTO.name());
        curso.setCategory(converterCategoryValue(cursoDTO.category()));
        curso.setStatus(Status.ATIVO);

        return curso;
    }

    public Category converterCategoryValue(String value){
        if(value == null){
            return null;
        }
        return switch (value){
                case "Front-end" -> Category.FRONTEND;
                case "Back-end" -> Category.BACKEND;
                default -> throw new IllegalArgumentException("Categoria inválida: " + value);
        };
    }
}

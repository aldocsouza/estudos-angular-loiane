package curso.aula.loiane.crudspring.Models.mappers;

import curso.aula.loiane.crudspring.Enums.Category;
import curso.aula.loiane.crudspring.Enums.Status;
import curso.aula.loiane.crudspring.Models.DTOs.CursoDTO;
import curso.aula.loiane.crudspring.Models.Cursos;
import curso.aula.loiane.crudspring.Models.DTOs.LessonDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CursosMapper {

    public CursoDTO cursoDto(Cursos curso){
        if(curso == null){
            return null;
        }

        List<LessonDTO> lessons = curso.getLessons()
                .stream()
                .map(lesson -> new LessonDTO(lesson.getId(), lesson.getName(), lesson.getYoutubeUrl()))
                .collect(Collectors.toList());

        return new CursoDTO(curso.getId(), curso.getName(), curso.getCategory().getValue(), lessons);
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

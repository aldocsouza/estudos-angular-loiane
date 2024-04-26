package curso.aula.loiane.crudspring.Models.mappers;

import curso.aula.loiane.crudspring.Models.CursoDTO;
import curso.aula.loiane.crudspring.Models.Cursos;
import org.springframework.stereotype.Component;

@Component
public class CursosMapper {
    public CursoDTO cursoDto(Cursos curso){
        if(curso == null){
            return null;
        }
        return new CursoDTO(curso.getId(), curso.getName(), curso.getCategory());
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
        curso.setCategory(cursoDTO.category());
        curso.setStatus("Ativo");

        return curso;
    }
}

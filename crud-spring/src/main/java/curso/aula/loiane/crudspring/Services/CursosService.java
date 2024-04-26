package curso.aula.loiane.crudspring.Services;

import curso.aula.loiane.crudspring.Models.CursoDTO;
import curso.aula.loiane.crudspring.Models.Cursos;
import curso.aula.loiane.crudspring.Models.mappers.CursosMapper;
import curso.aula.loiane.crudspring.Repository.CursosRepository;
import curso.aula.loiane.crudspring.exception.RecordNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Validated
@Service
@AllArgsConstructor
public class CursosService {

    @Autowired
    private CursosRepository cursosRepository;
    private CursosMapper cursosMapper;

    public List<CursoDTO> getCursos() {
        return cursosRepository.findAllByStatus("Ativo")
                .stream().map(cursosMapper::cursoDto)
                .collect(Collectors.toList());
    }

    public CursoDTO getCursoById(@PathVariable @NotNull @Positive Long id){
        return cursosRepository.findById(id)
                .map(cursosMapper::cursoDto)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CursoDTO criarCurso(@RequestBody @Valid CursoDTO curso){
        return cursosMapper.cursoDto(cursosRepository.save(cursosMapper.toEntity(curso)));
    }

    public CursoDTO updateCurso(@RequestBody @Valid CursoDTO curso){
        return cursosRepository.findById(curso.id())
                .map(recordFound -> {
                    recordFound.setName(curso.name());
                    recordFound.setCategory(curso.category());
                    return cursosMapper.cursoDto(cursosRepository.save(recordFound));
                }).orElseThrow(() -> new RecordNotFoundException(curso.id()));
    }

    public void removeCurso(@PathVariable @NotNull @Positive Long id){
        cursosRepository.delete(cursosRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }

}
/* Optional<Cursos> updateCurso = cursosRepository.findById(curso.getId());

        if(updateCurso.isPresent()){
            var cursoUpdate = updateCurso.get();
            cursoUpdate.setName(curso.getName());
            cursoUpdate.setCategory(curso.getCategory());

            return cursosRepository.save(cursoUpdate);
        }
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Curso não encontrado"
        );*/
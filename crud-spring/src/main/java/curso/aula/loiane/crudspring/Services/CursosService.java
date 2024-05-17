package curso.aula.loiane.crudspring.Services;

import curso.aula.loiane.crudspring.Enums.Status;
import curso.aula.loiane.crudspring.Models.Cursos;
import curso.aula.loiane.crudspring.Models.DTOs.CursoDTO;
import curso.aula.loiane.crudspring.Models.mappers.CursosMapper;
import curso.aula.loiane.crudspring.Repository.CursosRepository;
import curso.aula.loiane.crudspring.exception.RecordNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Validated
@Service
public class CursosService {

    @Autowired
    private CursosRepository cursosRepository;
    private CursosMapper cursosMapper;

    CursosService(CursosRepository cursosRepository, CursosMapper cursosMapper){
        this.cursosRepository = cursosRepository;
        this.cursosMapper = cursosMapper;
    }

    public List<CursoDTO> getCursos() {
        return cursosRepository.findAllByStatus(Status.ATIVO)
                .stream()
                .map(cursosMapper::cursoDto)
                .collect(Collectors.toList());
    }

    public CursoDTO getCursoById(@NotNull @Positive Long id){
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
                    Cursos cursos = cursosMapper.toEntity(curso);
                    recordFound.setName(curso.name());
                    recordFound.setCategory(cursosMapper.converterCategoryValue(curso.category()));
                    //recordFound.setLessons(cursos.getLessons());
                    recordFound.getLessons().clear();
                    cursos.getLessons().forEach(lesson -> recordFound.getLessons().add(lesson));
                    return cursosMapper.cursoDto(cursosRepository.save(recordFound));
                }).orElseThrow(() -> new RecordNotFoundException(curso.id()));
    }

    public void removeCurso(@NotNull @Positive Long id){
        cursosRepository.delete(cursosRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }

}

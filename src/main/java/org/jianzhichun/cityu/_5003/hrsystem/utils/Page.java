package org.jianzhichun.cityu._5003.hrsystem.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/12/2021 11:44 AM
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Page<T> {

    private Long total;
    private Long currPage;
    private Integer size;
    private List<T> items;
}

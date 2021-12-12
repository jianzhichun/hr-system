package org.jianzhichun.cityu._5003.hrsystem.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Zefeng Wang
 */

public class PageUtil {
    public static final String START = "START";
    public static final String LENGTH = "LENGTH";
    private final static int PAGE = 1 ; //起始页
    private final static int SIZE = 10 ; //每页数据条数
    private final static int MAX_SIZE = 100 ; //每页最大数据条数

    /**
     * 根据 页码, 单页数量, 总数量, 得出 起始索引 和 长度.
     * @author zefengwang
     * @param page page number
     * @param size page size
     * @param totalCount total count
     * @return start and length
     */
    public static StartAndLength getStartAndLength(int page, int size, int totalCount) {
        page = ( page < 0 ) ?  PageUtil.PAGE : page ;
        size = ( size <= 0 ) ?  PageUtil.SIZE : size ;
        size = Math.min(size, PageUtil.MAX_SIZE);

        int start = (page - 1) * size;
        int length = (size * page >= totalCount) ?
                totalCount - (page - 1) * size :
                size;
        if (start>totalCount) {
            start = 0;
            length = 0;
        }
        return new StartAndLength(start, length);
    }

    @Data
    @AllArgsConstructor
    public static class StartAndLength {
        private int start;
        private int length;
    }
}
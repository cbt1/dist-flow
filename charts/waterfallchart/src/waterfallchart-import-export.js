import extend from 'extend';
import conversion from 'qlik-object-conversion';

export function importProperties({ dataDefinition, defaultPropertyValues, exportFormat, initialProperties }) {
  const propTree = conversion.hypercube.importProperties({
    exportFormat,
    initialProperties,
    dataDefinition,
    defaultPropertyValues,
  });

  const props = propTree.qProperty;
  if (props.dimensionAxis.show === 'all') {
    props.dimensionAxis.show = 'labels';
  } else if (props.dimensionAxis.show === 'title') {
    props.dimensionAxis.show = 'none';
  }
  if (props.measureAxis.show === 'all') {
    props.measureAxis.show = 'labels';
  } else if (props.measureAxis.show === 'title') {
    props.measureAxis.show = 'none';
  }

  if (props.qHyperCubeDef.qMeasures.length > 0) {
    props.qDef.numFormatFromTemplate = props.qHyperCubeDef.qMeasures[0].qDef.numFormatFromTemplate;
    props.qDef.qNumFormat = props.qHyperCubeDef.qMeasures[0].qDef.qNumFormat;
    props.qHyperCubeDef.qMeasures.forEach((measure) => {
      measure.qDef.numFormatFromTemplate = props.qDef.numFormatFromTemplate;
      measure.qDef.qNumFormat = extend(true, {}, props.qDef.qNumFormat);
    });
  }

  return propTree;
}

export function exportProperties({ propertyTree, viewDataMode }) {
  const exportFormat = conversion.hypercube.exportProperties({
    propertyTree,
    viewDataMode,
  });

  return exportFormat;
}
